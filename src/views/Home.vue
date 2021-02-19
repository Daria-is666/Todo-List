<template>
    <div class="home">
        <h1 class="home_header">Категорически приветствую!</h1>
        <p class="home_text">Изволите свершать великие дела?</p>
        <router-link to="/todos" class="home_btn">Приступить к планированию</router-link>
    </div>
</template>

<style scoped>
.home
{
    position: relative;
    margin: 0 auto;
    text-align: center;

    
}
.home_header
{
    margin-bottom: 10px;
}
.home_text
{
    margin-bottom: 30px;
}
.home_btn
{
    border: 1px solid teal;
    text-decoration: none;
    color: black;
    padding: 10px 10px 10px 10px;
}
</style>