<script setup>
import DocumentationIcon from './icons/IconDocumentation.vue'
import WelcomeItem from './WelcomeItem.vue'
import { ref, reactive, nextTick, shallowReactive } from 'vue'

// ref
const message = ref('This is message!')
console.log(message.value)
message.value = 'This is changed message'
// reactive | Limitations: Works only for object types, connectivity loss
const counter = reactive({
  count: 0
})
counter.count++

const rawHtml = ref('<span style="color: red">This should be red.</span>')

const dynamicId = ref('dynamicId')

const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}

const exp = {
  number: 1,
  ok: true,
  url: "https://google.com",
  attributeName: "href",
  eventName: "click"
}

function toTitleDate(date = new Date()) {
  console.log("function called", date)
  return "title-" + date
}
function doSomething() {
  console.log("doSomething")
}

const evtCounter = reactive({ count: 0 })
function increment() {
  evtCounter.count++
}

const tickCounter = ref(0)
async function incrementTick() {
  tickCounter.value++

  // DOM not yet updated
  console.log(document.getElementById('counter').textContent) // 0

  await nextTick()
  // DOM is now updated
  console.log(document.getElementById('counter').textContent) // 1
}

const shallow = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})
// mutating state's own properties is reactive
shallow.foo++
// NOT reactive
shallow.nested.bar++

const raw = {}
const proxy = reactive(raw)
// proxy is NOT equal to the original.
console.log("proxy 1", proxy === raw) // false
// calling reactive() on the same object returns the same proxy
console.log("proxy 2", reactive(raw) === proxy) // true
// calling reactive() on a proxy returns itself
console.log("proxy 3", reactive(proxy) === proxy) // true
proxy.nested = raw
console.log("proxy 4", proxy.nested === raw) // false

</script>

<template>
  <!-- Template Syntax - Text Interpolation -->
  <WelcomeItem>
    <template #icon><DocumentationIcon /></template>
    <template #heading>Template Syntax - Text Interpolation</template>

    State that can trigger updates when changed are considered reactive.
    reactive() only works on objects (including arrays and built-in types like Map and Set).
    ref(), on the other hand, can take any value type and create an object that exposes the inner value under a .value
    property

    <h2>Example</h2>
    <div class="template-syntax">
      <h3>{{ message.split('').join('') }}</h3>
      <span>Message: {{ message }}</span>
      <br>
      <span>Count: {{counter.count}}</span>
    </div>
  </WelcomeItem>

  <!-- Template Syntax - Raw HTML -->
  <WelcomeItem>
    <template #icon><DocumentationIcon /></template>
    <template #heading>Template Syntax - Raw HTML</template>

    <h2>Example</h2>
    <p>Using text interpolation: {{ rawHtml }}</p>
    <p>Using v-html directive: <span v-html='rawHtml'></span></p>
  </WelcomeItem>

  <!-- Template Syntax - Attribute Bindings -->
  <WelcomeItem>
    <template #icon><DocumentationIcon /></template>
    <template #heading>Template Syntax - Attribute Bindings</template>

    <h2>Example</h2>
    <div v-bind:id='dynamicId'>1</div>
    <div :id='dynamicId'>2</div>
  </WelcomeItem>

  <!-- Template Syntax - Dynamically Binding Multiple Attributes & JavaScript Expressions -->
  <WelcomeItem>
    <template #icon><DocumentationIcon /></template>
    <template #heading>Template Syntax - Dynamically Binding Multiple Attributes & JavaScript Expressions</template>

    <h2>Example</h2>
    <div v-bind="objectOfAttrs">{ id: 'container', class: 'wrapper' }</div>
    {{ exp.number + 1 }}
    {{ exp.ok ? 'YES' : 'NO' }}
    <div :id="`list-${exp.number}`"></div>
  </WelcomeItem>

  <!-- Template Syntax - Calling Functions & Directives-->
  <WelcomeItem>
    <template #icon><DocumentationIcon /></template>
    <template #heading>Template Syntax - Calling Functions & Directives</template>

    <h2>Example</h2>
    <span :title="toTitleDate()">{{ toTitleDate() }}</span>

    <p v-if=true>Now you see me</p>
    <a v-bind:href=exp.url> ... </a>
    <!-- shorthand --><a :href=exp.url> ... </a>

    <a v-on:click="doSomething"> doSomething() </a>
    <!-- shorthand --><a @click="doSomething"> doSomething() </a>
  </WelcomeItem>

  <!-- Template Syntax - Dynamic Arguments -->
  <WelcomeItem>
    <template #icon><DocumentationIcon /></template>
    <template #heading>Template Syntax - Dynamic Arguments</template>

    <h2>Example</h2>
    <a v-bind:[exp.attributeName]="exp.url"> attrName </a>
    <!-- shorthand --><a :[exp.attributeName]="exp.url"> attributeName </a>

    <a v-on:[exp.eventName]="doSomething"> eventName </a>
    <!-- shorthand --><a @[exp.eventName]="doSomething"> eventName </a>
  </WelcomeItem>

  <!-- Reactivity Fundamentals - Declaring Reactive State -->
  <WelcomeItem>
    <template #icon><DocumentationIcon /></template>
    <template #heading>Reactivity Fundamentals - Declaring Reactive State</template>

    <h2>Example</h2>
    <button @click="increment">
      {{ evtCounter.count }}
    </button>
  </WelcomeItem>

  <!-- Reactivity Fundamentals - DOM Update Timing -->
  <WelcomeItem>
    <template #icon><DocumentationIcon /></template>
    <template #heading>Reactivity Fundamentals - DOM Update Timing</template>

    A utility for waiting for the next DOM update flush.
    <h2>Example</h2>
    <button id="counter" @click="incrementTick">{{ tickCounter }}</button>
  </WelcomeItem>

  <!-- Reactivity Fundamentals - Deep Reactivity -->
  <WelcomeItem>
    <template #icon><DocumentationIcon /></template>
    <template #heading>Reactivity Fundamentals - Deep Reactivity</template>

    Unlike reactive(), there is no deep conversion: only root-level properties are reactive for a shallow reactive object.
    Property values are stored and exposed as-is - this also means properties with ref values will not be automatically unwrapped.
    <h2>Example</h2>{{shallow.foo}} - {{shallow.nested.bar}}
  </WelcomeItem>

  <!-- Reactivity Fundamentals - Reactive Proxy vs. Original -->
  <WelcomeItem>
    <template #icon><DocumentationIcon /></template>
    <template #heading>Reactivity Fundamentals - Reactive Proxy vs. Original</template>

    Returned value from reactive() is a Proxy of the original object, which is not equal to the original object
  </WelcomeItem>

  <!-- Reactivity Fundamentals - Limitations of reactive() -->
  <WelcomeItem>
    <template #icon><DocumentationIcon /></template>
    <template #heading>Reactivity Fundamentals - Limitations of reactive()</template>

    1. It only works for object types. It cannot hold primitive types such as string, number or boolean.
    2. When we assign or destructure a reactive object's property into local variables, or when we pass that property into a function, 
    we will lose the reactivity connection
  </WelcomeItem>

</template>

<style scoped>
</style>
