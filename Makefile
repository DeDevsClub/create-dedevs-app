install:
	cd apps/api && yarn &
	cd apps/docs && yarn &
	cd apps/portfolio && yarn &
	cd apps/nextjs && yarn &
	cd apps/themer && yarn &

build:
	cd apps/portfolio && yarn build &
	cd apps/nextjs && yarn build &
	cd apps/themer && yarn build

dev:
	cd apps/api && yarn dev &
	cd apps/docs && yarn dev &
	cd apps/portfolio && yarn dev &
	cd apps/nextjs && yarn dev &
	cd apps/themer && yarn dev

api:
	cd apps/api && yarn dev

docs:
	cd apps/docs && yarn dev

nextjs:
	cd apps/nextjs && yarn dev

portfolio:
	cd apps/portfolio && yarn dev

themer:
	cd apps/themer && yarn dev