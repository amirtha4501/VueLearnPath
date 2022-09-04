<script setup>
import DocumentationIcon from './icons/IconDocumentation.vue'
import WelcomeItem from './WelcomeItem.vue'
import { ref, reactive } from 'vue'

// ref
const message = ref('This is message!')
console.log(message.value)
message.value = 'This is changed message'
// reactive
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

</template>

<style scoped>
</style>
