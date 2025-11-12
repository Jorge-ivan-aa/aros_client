#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

function generateOptimalPalette(baseColor) {
    function hexToHsl(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        let r = parseInt(result[1], 16) / 255;
        let g = parseInt(result[2], 16) / 255;
        let b = parseInt(result[3], 16) / 255;

        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h * 360, s * 100, l * 100];
    }

    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    function mix(color1, color2, weight) {
        const hex = (c) => {
            c = c.replace('#', '');
            return [c.substr(0, 2), c.substr(2, 2), c.substr(4, 2)]
                .map(x => parseInt(x, 16));
        };

        const [r1, g1, b1] = hex(color1);
        const [r2, g2, b2] = hex(color2);

        const r = Math.round(r1 * (1 - weight) + r2 * weight);
        const g = Math.round(g1 * (1 - weight) + r2 * weight);
        const b = Math.round(b1 * (1 - weight) + r2 * weight);

        return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    }

    const [h, s, l] = hexToHsl(baseColor);

    let optimalS = s;
    let optimalL = l;

    // Solo ajustar si está fuera de rangos razonables
    if (l < 20) optimalL = 35; // Muy oscuro -> un poco más claro
    else if (l > 80) optimalL = 65; // Muy claro -> un poco más oscuro
    else optimalL = l; // Mantener igual

    // Mantener la saturación original, solo ajustar si es extrema
    if (s > 90) optimalS = 80;
    else optimalS = s;

    const optimal500 = hslToHex(h, optimalS, optimalL);

    return {
        50: mix('#ffffff', optimal500, 0.95),
        100: mix('#ffffff', optimal500, 0.9),
        200: mix('#ffffff', optimal500, 0.75),
        300: mix('#ffffff', optimal500, 0.5),
        400: mix('#ffffff', optimal500, 0.25),
        500: optimal500,
        600: mix('#000000', optimal500, 0.25),
        700: mix('#000000', optimal500, 0.5),
        800: mix('#000000', optimal500, 0.75),
        900: mix('#000000', optimal500, 0.9),
        950: mix('#000000', optimal500, 0.95)
    };
}

function updateEnvironmentFile(businessName, palette, production = false) {
    const envPath = path.join(process.cwd(), 'src', 'environments', 'environment.ts');

    if (!fs.existsSync(envPath)) {
        console.error('Error: No se encontro environment.ts');
        process.exit(1);
    }

    let envContent = fs.readFileSync(envPath, 'utf8');

    const newConfig = `export const environment = {
  production: ${production},
  apiUrl: 'http://localhost:8080/api',
  customer: '${businessName.replace(/'/g, "\\'")}',
  primary: {
    50: '${palette[50]}',
    100: '${palette[100]}',
    200: '${palette[200]}',
    300: '${palette[300]}',
    400: '${palette[400]}',
    500: '${palette[500]}',
    600: '${palette[600]}',
    700: '${palette[700]}',
    800: '${palette[800]}',
    900: '${palette[900]}',
    950: '${palette[950]}'
  }
};`;

    const envRegex = /export const environment = \{[\s\S]*?\};/;

    if (envRegex.test(envContent)) {
        envContent = envContent.replace(envRegex, newConfig);
    } else {
        envContent += '\n\n' + newConfig;
    }

    fs.writeFileSync(envPath, envContent, 'utf8');
    return envPath;
}

function createBackup(originalPath) {
    const backupPath = originalPath + '.backup';
    fs.copyFileSync(originalPath, backupPath);
    return backupPath;
}

async function main() {
    console.log('Angular Brand Setup\n');

    try {
        const businessName = await ask('Nombre del negocio: ');
        const primaryColor = await ask('Color principal (hex): ');
        const isProduction = await ask('Produccion? (s/n): ');
        const production = isProduction.toLowerCase() === 's';

        console.log('Generando configuracion...');

        const palette = generateOptimalPalette(primaryColor);

        const envPath = path.join(process.cwd(), 'src', 'environments', 'environment.ts');
        createBackup(envPath);

        updateEnvironmentFile(businessName, palette, production);

        console.log('Configuracion completada!');
        console.log('Archivo: src/environments/environment.ts');
        console.log('Customer:', businessName);
        console.log('Color 500:', palette[500]);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        rl.close();
    }
}

const angularJsonPath = path.join(process.cwd(), 'angular.json');
if (!fs.existsSync(angularJsonPath)) {
    console.error('Error: No es proyecto Angular');
    process.exit(1);
}

main();