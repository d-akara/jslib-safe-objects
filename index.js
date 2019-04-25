function makePrimitiveProxy(value) {
    const staticValueProxy = new Proxy(()=>null, {
        get: function(target, key) {
            if (key==='_') return value
            if (key==='__') return (defaultValue) => {
                if (value === undefined || value === null) return defaultValue
                return value
            }

            else value = undefined

            return staticValueProxy
        },
        apply: function(target, thisArg, argumentsList) {
            return staticValueProxy
        }
    })
    return staticValueProxy
}

function safe(target) {
   const _this = this
   if ( typeof target === "function") return function() {
      return safe(target.apply(_this, arguments));
   };
  
   if ( typeof target !== "object" || target === null) {
      return makePrimitiveProxy(target)
   }
   
   // Create a safe proxy for the target
   const proxy = new Proxy(target, {
       get: function(target, key) {
            // Resolve the actual value when the _ terminator key is used
            if (key==='_') return target;

            // When a property is requested, wrap it in a proxy
            return safe.call(target, target[key]);
       }
    });
    return proxy;
}

module.exports = safe