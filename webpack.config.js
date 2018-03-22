const webpack = require('webpack')
const path = require('path')//node中的
const HTMLPlugin = require('html-webpack-plugin');//生成index页面的一个插件
const isDev = process.env.NODE_ENV==='development';//判断是生产环境还是开发环境
const ExtractPlugin = require('extract-text-webpack-plugin')
const config = {
	target:"web",
	entry:path.join(__dirname, ''),//入口文件
	output:{
		filename:'bundle.js',
		path:path.join(__dirname,'dist')
	},
	module:{
		rules:[
			{
				test:/\.vue$/,
				loader:'vue-loader'//处理vue组件
			},
			{
				test:/\.css$/,
				use:[
					'style-loader',
					'css-loader'
				]
			},
			{
				test:/\.jsx$/,
				exclude:/(node_modules|bower_components)/,
				loader:'babel-loader'
			},
			{
				test:/\.(gif|png|jpeg|jpg)$/,
				use:[
					loader:'url-loader',
					options:{
						limit:1024,
						name:'[name]-lizn.[ext]'
					}
				]
			}
		]
	},
	plugins:[
		new webpack.DefinePlugin({
			'process.env':{
				NODE_ENV:isDev?'"development"':'"production"'
			}
		}),
		new HTMLPlugin()
	]
}
if(idDev){
	config.module.rules.push(
		{
			test:/\.styl$/,
			use:[
				'style-loader',
				'css-loader',
				'stylus-loader'
			]			
		}
	)
	config.devtool="#cheap-module-eval-source-map"
	config.devServer = {
		port:8080,
		host:'0,0,0,0',
		overlay:{
			errors:true
		},
		hot:true
	};

	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)
}else{
	config.module.rules.push(
		{
			test:/\.styl$/,
			use:ExtractPlugin.extract({
				fallback:"style-loader",
				use:[
					'css-loader',
					{
						loader:'postcss-loader',
						options:{
							sourceMap:true
						}
					},
					'stylus-loader'
				]
			})
		}
	)
}