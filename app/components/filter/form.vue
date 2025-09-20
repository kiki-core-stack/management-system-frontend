<template>
    <el-form class="flex flex-wrap gap-1">
        <slot />
        <div class="gap-btns flex flex-wrap items-center">
            <slot name="before-submit-btn" />
            <el-button
                native-type="submit"
                type="primary"
            >
                搜尋
            </el-button>
            <slot name="after-submit-btn" />
        </div>
    </el-form>
</template>

<style lang="scss" scoped>
:deep(.el-form-item) {
    @apply items-center mb-0;
}

/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-form-item__content > .el-input) {
    --el-input-width: 220px;
}

/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-form-item__content > .el-select) {
    --el-select-width: 220px;
}
</style>
