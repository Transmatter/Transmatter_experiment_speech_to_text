<template>
    <div class="card w-96 bg-base-100 shadow-xl my-6 mx-6">
        <div class="card-body">
            <h2 class="card-title text-3xl">{{title}}</h2>
            <p class="text-3xl text-center">{{content}}</p>
            <div class="card-actions justify-center">
                <button class="btn btn-primary text-base-100">{{buttonName}}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props :  {
        title: {
            type: String,
            default: 'title'
        },
        content: {
            type: String,
            default: 'content'
        },
        buttonName : {
            type: String,
            default: 'go'
        }
    }
}
</script>
