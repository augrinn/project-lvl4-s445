install:
	npm install

build:
	npm run build

start:
	npx babel-node -- index.js

lint:
	npx eslint .
	
publish:
	npm publish

test:
	npm test
test-coverage:
	npm test -- --coverage