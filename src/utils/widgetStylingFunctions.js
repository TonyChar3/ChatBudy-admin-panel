/**
 * Preset color array for the user to choose from
 */
const colorList = [
    '#fafafa',
    '#dcdcde',
    '#f25b50',
    '#f28150',
    '#f29450',
    '#f2b150',
    '#edf250',
    '#cff250',
    '#a4f250',
    '#81f250',
    '#50f26b',
    '#50f2a7',
    '#50f2da',
    '#50d4f2',
    '#0c64f2',
    '#7050f2',
    '#a950f2',
    '#c450f2',
    '#f250f2',
    '#f2509c',
    '#d6d4d5',
    '#919091',
    '#4a4849',
    '#1c1b1c'
]
/**
 * Convert RGB -> Hex #
 */
const RgbToHex = (r, g, b) => {
    // Clamp and round each component and then convert it to a hexadecimal string
    const red = Math.round(Math.min(255, Math.max(0, r))).toString(16).padStart(2, '0');
    const green = Math.round(Math.min(255, Math.max(0, g))).toString(16).padStart(2, '0');
    const blue = Math.round(Math.min(255, Math.max(0, b))).toString(16).padStart(2, '0');
    // return the hex code
    return `#${red}${green}${blue}`
}
/**
 * Convert Hex # -> RGB
 */
const HexToRgb = (hex_code) => {
    // remove the hash #
    let hex = hex_code.replace(/^#/, '');
    // if the code is 3 caracter long
    if(hex.length === 3){
        // replicate each to get to six digits
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    // Parse r, g, b values
    const bigInt = parseInt(hex, 16);
    const r_val = (bigInt >> 16) & 255;
    const g_val = (bigInt >> 8) & 255;
    const b_val = bigInt & 255;
    // return an object
    return {
        r_value: r_val,
        g_value: g_val,
        b_value: b_val
    }
}

export { colorList, RgbToHex, HexToRgb }