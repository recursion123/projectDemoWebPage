<template>
    <div>
        <el-row>
            <el-button type="text" icon="arrow-left" @click="goto('/admin/main')" class="back">返回列表
            </el-button>
        </el-row>
        <el-row>
            <el-tag
                    :key="tag"
                    v-for="tag in article.tags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                {{tag.name}}
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue.name"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-add-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-row>
        <el-row>
            <el-col :span="12" :offset="6">
                <el-input placeholder="文章标题" v-model="article.title"></el-input>
            </el-col>
        </el-row>
        <div class="summernote"></div>
    </div>


</template>
<style>
    .el-row {
        margin-bottom: 15px;
    }

    .el-tag {
        margin-left: 10px;
    }

    .button-add-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>
<script>
    export default {
        mounted() {
            var v = this;
            var SaveButton = function () {
                return $.summernote.ui.button({
                    contents: '<i class="fa fa-save"/> 保存',
                    tooltip: '保存',
                    click: function () {
                        v.saveArticle();
                    }
                }).render();   // return button as jquery object
            }

            $('.summernote').summernote({
                lang: 'zh-cn',
                height: '600',
                codemirror: { // codemirror options
                    theme: 'monokai'
                },
                toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'italic', 'underline', 'clear']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['height', ['height']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture', 'video', 'hr']],
                    ['view', ['fullscreen', 'codeview']],
                    ['help', ['help']],
                    ['SaveButton', ['SaveButton']]
                ], buttons: {SaveButton: SaveButton}
            });


            if (this.$route.params.articleID != 0) {
                this.loadData();
            }
        },
        data() {
            return {
                article: {tags: []},
                inputVisible: false,
                inputValue: {name: ''}
            }
        },
        methods: {
            loadData() {
                this.$http.post('/api/blog/findArticleByID?id=' + this.$route.params.articleID, {}).then((response) => {
                    this.article = response.body;
                    $('.summernote').summernote('code', this.article.content);
                }, () => {
                    alert("error");
                });
            },
            saveArticle() {
                this.article.content = $('.summernote').summernote('code');
                if (this.article.tags && this.article.title) {
                    if (this.$route.params.articleID != 0) {
                        this.$http.post('/api/admin/updateArticle',
                            this.article).then(() => {
                            this.$message.success('更新成功');
                        }, (response) => {
                            this.$message.error('更新失败');
                        });
                    } else {
                        this.$http.post('/api/admin/insertArticle',
                            this.article).then(() => {
                            this.$message.success('保存成功');
                        }, (response) => {
                            this.$message.error('保存失败');
                        });
                    }
                } else {
                    this.$message.error('标题和标签不能为空');
                }
            },
            handleClose(tag) {
                this.article.tags.splice(this.article.tags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue.name) {
                    this.$http.post('/api/admin/insertArticleTag',
                        inputValue).then((response) => {
                        inputValue.id = response.body;
                        this.article.tags.push(inputValue);
                    }, (response) => {
                        alert(JSON.stringify(response.body));
                    });
                }
                this.inputVisible = false;
                this.inputValue = {};
            }
        }
    }
</script>