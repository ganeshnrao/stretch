<template lang="pug">
div
  b-navbar(type="dark" variant="dark")
    b-navbar-brand Stretch
    b-navbar-nav
      b-nav-item(to="/" exact) Exercises
      b-nav-item(to="/history") History
  .container-fluid.py-3
    nuxt
</template>
