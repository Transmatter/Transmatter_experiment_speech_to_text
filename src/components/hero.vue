<template>
    <div class="hero min-h-0 bg-base-200" style="background-image: url(https://img.freepik.com/free-photo/blind-person-reading-home_23-2149275720.jpg?w=1060&t=st=1660748235~exp=1660748835~hmac=275ff01dac5faa71ae627b48e0d13cf646eb5894b00ef3c2c22738148f46f29a);">
        <div class="hero-content text-center">
            <div class="max-w-md py-6">
                <h1 class="text-5xl text-base-100 font-bold">Welcome, {{this.$store.getters.getCurrentUser.username}}</h1>
                <p class="py-6 text-base-100">
                    you are using this platform as <span class="font-bold">{{this.$store.getters.getRole.substring(5)}}</span> 
                </p>
                <button class="btn btn-primary text-base-100">Get Started</button>
            </div>
        </div>
    </div>
</template>
