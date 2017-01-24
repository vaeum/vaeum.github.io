run:
	./node_modules/.bin/gulp

install:
	gem install bundler -v 1.11.2
	bundle install
	npm install

build-prod:
	JEKYLL_ENV=production jekyll build

build:
	JEKYLL_ENV=development jekyll build

styleguide:
	./node_modules/nucleus-styleguide/bin.js  --title StyleBook --target ./_site/styleguide nucleus --css ./_assets/scss/**/*.scss --template ./_templates/styleguide
