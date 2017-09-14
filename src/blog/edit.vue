<template>
    <div>
        <div class="summernote">

        </div>
    </div>
</template>
<style>

</style>
<script>
    export default {
        mounted() {
            $('.summernote').summernote({
                lang: 'zh-cn',
                height: '600',
                codemirror: { // codemirror options
                    theme: 'monokai'
                }
            });
        },
        data() {
            return {}
        },
        methods: {
            test() {
                var html = $('.summernote').summernote('code');
                alert(html);
            }
        },
        created: function () {

        }
    }
</script>