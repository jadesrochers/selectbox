module.exports = {
"env" : {

    "umd" : {
        "presets": [ 
            "@babel/preset-react", 
            [ "@babel/preset-env", 
                {
                    "targets": {
                        "browsers": [
                            ">0.5%",
                            "not ie 11",
                            "not op_mini all"
                        ]
                    }
                }],
        ],
        "plugins": [ ["@emotion", { "sourceMap":false } ] ]
    },

    "es6" : {
        "presets": [ 
            "@babel/preset-react", 
            [ "@babel/preset-env", 
                {
                    "targets": {
                        "esmodules": true
                    },
                    modules: false,
                }],
        ],
        "plugins": [ ["@emotion", {"sourceMap":false }] ]
    },

    "jest" : {
        "presets": [ 
            "@babel/preset-react", 
            [ "@babel/preset-env", 
                {  
                    "targets": {
                        "node": 12
                    }
                }],
        ],
        "plugins": ["@emotion"]
    }
}
}
