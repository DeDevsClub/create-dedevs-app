install:
	cd apps/api && yarn install
	cd apps/docs && yarn install
	cd apps/portfolio && yarn install
	cd apps/nextjs && yarn install

build:
	cd apps/portfolio && yarn build &
	cd apps/nextjs && yarn build

dev:
	cd apps/api && yarn dev &
	cd apps/docs && yarn dev &
	cd apps/portfolio && yarn dev &
	cd apps/nextjs && yarn dev

api:
	cd apps/api && yarn dev

docs:
	cd apps/docs && yarn dev

nextjs:
	cd apps/nextjs && yarn dev

portfolio:
	cd apps/portfolio && yarn dev