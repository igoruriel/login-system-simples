export function measureTime() {
  return (target, propertyKey, descriptor) => {
    const original = descriptor.value;
    descriptor.value = function (...args) {
      const t1 = performance.now();
      const result = original.apply(this, ...args);
      const t2 = performance.now();
      console.log(`${propertyKey}: ${t2 - t1}ms`);
      return result;
    };

    return descriptor;
  };
}

export var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;

  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
    r = Reflect.decorate(decorators, target, key, desc);
  } else {
    for (var i = decorators.length - 1; i >= 0; i--) {
      if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    };
  };

  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

