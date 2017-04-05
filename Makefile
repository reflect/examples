.PHONY: build deploy


GULP := gulp

setup:
	npm install
	npm rebuild node-sass
	@if [ "$(shell which gulp)" == "" ]; then npm install -g gulp; fi

build:
	$(GULP) build

deploy: build
	git push origin master
	git subtree push --prefix build origin gh-pages
