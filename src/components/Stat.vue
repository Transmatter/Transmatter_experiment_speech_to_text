<template>
    <div class="stat">
        <div class="stat-title">{{title}}</div>
        <div class="stat-value">{{content}}</div>
        <div class="stat-desc">{{text}}</div>
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
        text : {
            type: String,
            default: 'go'
        }
    }
}
</script>
