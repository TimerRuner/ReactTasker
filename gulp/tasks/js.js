import webpack from "webpack-stream"

const babelOptions = (preset) => {
    const opts = {
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-proposal-class-properties"],
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

const jsLoaders = () => {
    const loaders = [
        {
            loader: "babel-loader",
            options: babelOptions(),
        },
    ]
    return loaders
}

export const js = () => {
    return app.gulp
        .src(app.path.src.js, { sourcemaps: app.isDev })
        .pipe(
            app.plugins.plumber(
                app.plugins.notify.onError({
                    title: "JS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(
            webpack({
                mode: app.isBuild ? "production" : "development",
                entry: {
                    main: ["@babel/polyfill", "./src/js/index.jsx"],
                },
                output: {
                    filename: "app.min.js",
                },
                resolve: {
                    extensions: [".js", ".jsx", ".json"],
                },
                module: {
                    rules: [
                        {
                            test: /\.js$/,
                            exclude: /node_modules/,
                            use: jsLoaders(),
                        },
                        {
                            test: /\.jsx$/,
                            exclude: /node_modules/,
                            use: {
                                loader: "babel-loader",
                                options: {
                                    presets: [
                                        "@babel/preset-env",
                                        "@babel/preset-react",
                                    ],
                                },
                            },
                        },
                    ],
                },
            })
        )
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream())
}
