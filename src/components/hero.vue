<template>
    <div class="hero min-h-0 bg-base-200">
        <div class="hero-content text-center">
            <div class="max-w-md py-6">
                <h1 class="text-5xl font-bold">Welcome, {{this.$store.getters.getCurrentUser.username}}</h1>
                <p class="py-6">
                    you are using this platform as <span class="font-bold">{{this.$store.getters.getRole.substring(5)}}</span> 
                </p>
                <button class="btn btn-primary">Get Started</button>
            </div>
        </div>
    </div>
</template>
