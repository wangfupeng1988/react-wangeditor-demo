const { override, addWebpackModuleRule } = require("customize-cra");
module.exports = override(
    addWebpackModuleRule(
    	{
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto'
        }
    )
)
