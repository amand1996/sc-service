## Hydra Express Plugins

`HydraExpressPlugin` extends `HydraPlugin`. See the [Hydra plugin documention](https://github.com/flywheelsports/hydra/blob/master/plugins.md) for more details.

Some caveats for `HydraExpressPlugin` vs `HydraPlugin`:

1. In `HydraExpressPlugin`, `setHydraExpress(hydraExpress)` is called instead of `setHydra(hydra)`; `setHydraExpress` calls `setHydra(hydraExpress.getHydra())` internally.

2. `HydraExpressPlugin.setConfig` is called with the service-level config rather than the hydra-level config like `HydraPlugin.setConfig`. `HydraExpressPlugin.setConfig(config)` calls `super.setConfig(config.hydra)` internally.

Make sure to call `super.setHydraExpress` or `super.setConfig` if you're extending `HydraExpressPlugin`, or otherwise ensure that the `HydraPlugin` methods get called with the appropriate arguments.

See the [`HydraExpressLogger` plugin](https://github.com/flywheelsports/fwsp-logger/blob/master/lib/HydraExpressLogger.js) for an example of a plugin that registers Express middleware (look at `onServiceReady`).