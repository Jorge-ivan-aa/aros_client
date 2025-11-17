#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Cargar variables de entorno desde .env
function loadEnvFile() {
    const envPath = path.join(process.cwd(), '.env');

    if (!fs.existsSync(envPath)) {
        console.log('No se encontró archivo .env, usando valores por defecto');
        return;
    }

    try {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const lines = envContent.split('\n');

        let loadedCount = 0;

        lines.forEach(line => {
            // Ignorar líneas vacías y comentarios
            line = line.trim();
            if (!line || line.startsWith('#')) {
                return;
            }

            // Buscar el primer signo igual
            const equalsIndex = line.indexOf('=');
            if (equalsIndex === -1) {
                return;
            }

            const key = line.substring(0, equalsIndex).trim();
            let value = line.substring(equalsIndex + 1).trim();

            // Remover comillas si existen
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.substring(1, value.length - 1);
            }

            // Solo establecer si no existe ya en process.env
            if (key && value && !process.env[key]) {
                process.env[key] = value;
                loadedCount++;
            }
        });

        if (loadedCount > 0) {
            console.log(`Cargadas ${loadedCount} variables desde .env`);
        }

    } catch (error) {
        console.error('Error cargando archivo .env:', error.message);
    }
}

function generateOptimalPalette(baseColor) {
    function hexToHsl(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) {
            throw new Error('Color hexadecimal inválido');
        }

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
        h = h % 360;
        if (h < 0) h += 360;

        s = Math.max(0, Math.min(100, s)) / 100;
        l = Math.max(0, Math.min(100, l)) / 100;

        const a = s * Math.min(l, 1 - l);
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
        const g = Math.round(g1 * (1 - weight) + g2 * weight);
        const b = Math.round(b1 * (1 - weight) + b2 * weight);

        return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    }

    const [h, s, l] = hexToHsl(baseColor);

    // Optimizar el color 500 para que funcione bien en ambos modos
    let optimalS = s;
    let optimalL = l;

    // Ajustar para que el 500 sea visible en ambos modos
    if (l < 25) optimalL = 45;
    else if (l > 75) optimalL = 55;
    else optimalL = l;

    // Ajustar saturación para mejor apariencia
    if (s < 30) optimalS = 50;
    else if (s > 85) optimalS = 75;
    else optimalS = s;

    const optimal500 = hslToHex(h, optimalS, optimalL);

    // Generar paleta con mejor gradación
    return {
        50: mix('#ffffff', optimal500, 0.05),
        100: mix('#ffffff', optimal500, 0.12),
        200: mix('#ffffff', optimal500, 0.25),
        300: mix('#ffffff', optimal500, 0.38),
        400: mix('#ffffff', optimal500, 0.50),
        500: optimal500,
        600: mix('#000000', optimal500, 0.12),
        700: mix('#000000', optimal500, 0.25),
        800: mix('#000000', optimal500, 0.38),
        900: mix('#000000', optimal500, 0.50),
        950: mix('#000000', optimal500, 0.75)
    };
}

function updateEnvironmentFile(apiUrl, customer, palette, production = false) {
    const envPath = path.join(process.cwd(), 'src', 'environments', 'environment.ts');

    if (!fs.existsSync(envPath)) {
        console.error('Error: No se encontró environment.ts');
        process.exit(1);
    }

    const newConfig = `export const environment = {
  production: ${production},
  apiUrl: '${apiUrl}',
  customer: '${customer.replace(/'/g, "\\'")}',
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

    fs.writeFileSync(envPath, newConfig, 'utf8');
    return envPath;
}

function main() {
    console.log('Pre-build: Generando configuración desde variables de entorno\n');

    // Cargar variables de entorno desde .env
    loadEnvFile();
    console.log('');

    try {
        // Obtener variables de entorno
        const baseColor = process.env.BASE_COLOR || '#af8223';
        const apiUrl = process.env.API_URL || 'http://localhost:8080/api';
        const customer = process.env.CUSTOMER || 'Pruebas';
        const production = process.env.NODE_ENV === 'production' || false;

        console.log('Configuración completada!');
        console.log('  - BASE_COLOR:', baseColor);
        console.log('  - API_URL:', apiUrl);
        console.log('  - CUSTOMER:', customer);
        console.log('  - PRODUCTION:', production);
        console.log('');

        console.log('Generando paleta de colores...');
        const palette = generateOptimalPalette(baseColor);

        const envPath = updateEnvironmentFile(apiUrl, customer, palette, production);

        console.log('✅ Configuración completada!');
        console.log('Archivo actualizado:', envPath);
        console.log('Customer:', customer);
        console.log('Color principal:', palette[500]);
        console.log('');

    } catch (error) {
        console.error('Error en pre-build:', error.message);
        process.exit(1);
    }
}

// Verificar que es un proyecto Angular
const angularJsonPath = path.join(process.cwd(), 'angular.json');
if (!fs.existsSync(angularJsonPath)) {
    console.error('Error: No es un proyecto Angular');
    process.exit(1);
}

main();
