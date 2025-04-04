<template>
    <el-dropdown trigger="click">
        <el-action-btn
            :size="btnSize"
            :type="btnType"
        >
            {{ btnText }}
        </el-action-btn>
        <template #dropdown>
            <el-dropdown-menu>
                <slot />
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts" setup>
interface Props {
    btnSize?: string;
    btnText?: string;
    btnType?: string;
}

// Define props, models and emits
withDefaults(
    defineProps<Props>(),
    {
        btnSize: 'small',
        btnText: '操作',
        btnType: 'primary',
    },
);
</script>
