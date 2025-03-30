install:
	cd apps/api && pnpm i &
	cd apps/docs && pnpm i &
	cd apps/portfolio && pnpm i &
	cd apps/nextjs && pnpm i &
	cd apps/hashnode/packages/starters/hashnode && pnpm i &

build:
	cd apps/portfolio && pnpm run build &
	cd apps/nextjs && pnpm run build &
	cd apps/hashnode/packages/starters/hashnode && pnpm run build &

clean:
	rm -rf node_modules
	rm -rf apps/api/node_modules
	rm -rf apps/docs/node_modules
	rm -rf apps/hashnode/packages/starters/hashnode/node_modules
	rm -rf apps/portfolio/node_modules
	rm -rf apps/nextjs/node_modules

dev:
	cd apps/api && pnpm run dev &
	cd apps/docs && pnpm run dev &
	cd apps/hashnode/packages/starters/hashnode && pnpm run dev &
	cd apps/portfolio && pnpm run dev &
	cd apps/nextjs && pnpm run dev &

api:
	cd apps/api && pnpm run dev

docs:
	cd apps/docs && pnpm run dev

hashnode:
	cd apps/hashnode/packages/starters/hashnode && pnpm run dev

nextjs:
	cd apps/nextjs && pnpm run dev

portfolio:
	cd apps/portfolio && pnpm run dev
