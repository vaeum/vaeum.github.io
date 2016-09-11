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
