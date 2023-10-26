/**
 * Function to sanitize input values
 */
const sanitizeInputValue = (input_val) => {
    // strip html tags
    const stripped = input_val.replace(/<\/?[^>]+(>|$)/g, "");
    // remove extra white space
    const santitized_input = stripped.replace(/\s+/g, ' ').trim();
    // return it
    return santitized_input
}
/**
 * Function to sanitize the chatroom input
 */
const sanitizeChatInputValue = (input_val) => {
    // strip any html tags
    const stripped = input_val.replace(/<\/?[^>]+(>|$)/g, "");
    // return it
    return stripped
}

export { sanitizeInputValue,sanitizeChatInputValue }