install:
	cd apps/api && yarn &
	cd apps/docs && yarn &
	cd apps/portfolio && yarn &
	cd apps/nextjs && yarn &
	cd apps/themer && yarn &
	cd apps/hashnode/packages/starters/hashnode && pnpm i &

build:
	cd apps/portfolio && yarn build &
	cd apps/nextjs && yarn build &
	cd apps/themer && yarn build &
	cd apps/hashnode/packages/starters/hashnode && pnpm run build &

clean:
	rm -rf node_modules
	rm -rf apps/api/node_modules
	rm -rf apps/docs/node_modules
	rm -rf apps/hashnode/packages/starters/hashnode/node_modules
	rm -rf apps/portfolio/node_modules
	rm -rf apps/nextjs/node_modules
	rm -rf apps/themer/node_modules

dev:
	cd apps/api && yarn dev &
	cd apps/docs && yarn dev &
	cd apps/hashnode/packages/starters/hashnode && pnpm run dev &
	cd apps/portfolio && yarn dev &
	cd apps/nextjs && yarn dev &
	cd apps/themer && yarn dev

api:
	cd apps/api && yarn dev

docs:
	cd apps/docs && yarn dev

hashnode:
	cd apps/hashnode/packages/starters/hashnode && pnpm run dev

nextjs:
	cd apps/nextjs && yarn dev

portfolio:
	cd apps/portfolio && yarn dev

themer:
	cd apps/themer && yarn dev