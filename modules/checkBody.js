const checkBody = (body, keys) => keys.every( key => !!body[key]);

module.exports = { checkBody }