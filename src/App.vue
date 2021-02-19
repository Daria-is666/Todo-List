<template>
  <div id="app">
    <div class="header_app">
      <h2>To-Do List</h2>
    </div>
      <hr>
      <router-view />
  </div>
</template>


<style >
.todo
{   
 display: flex;
 justify-content: space-between;

}
.header_app
{
  display: flex;
 justify-content: space-between;
 flex-direction: row;
}
.home_back
{
  position: relative;
  display: flex;
  right: 0;
  margin: 0 auto;
}
</style>
