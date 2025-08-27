<template>
    <data-table-page
        v-model:form-data="formData"
        dialog-title-suffix="管理員身分組"
        title="管理員身分組管理"
        :crud-api="useAdminRoleApi()"
        :form-rules="formRules"
        :permissions="{ base: 'admin.role' }"
    >
        <template #table>
            <el-table-column
                label="名稱"
                prop="name"
            />
        </template>
        <template #form>
            <el-form-input
                v-model="formData.name"
                label="名稱"
                maxlength="16"
                prop="name"
            />
            <el-form-item label="權限">
                <el-tree-select
                    v-model="formData.permissions"
                    max-collapse-tags="20"
                    size="large"
                    :data="permissionTree"
                    clearable
                    collapse-tags
                    collapse-tags-tooltip
                    multiple
                    show-checkbox
                />
            </el-form-item>
        </template>
    </data-table-page>
</template>

<script lang="ts" setup>
import type { AdminRoleData } from '@kiki-core-stack/pack/types/data/admin';

// Constants/Refs/Variables
const formData = ref<TablePageFormData<AdminRoleData>>({
    id: '',
    name: '',
    permissions: [],
});

const formRules: ElFormRules<TablePageFormData<AdminRoleData>> = { name: [createElFormItemRuleWithDefaults('請輸入名稱')] };
const permissionTree = ref<ElTreeNode[]>([]);

// Load data
const response = await useAdminPermissionApi().getTree();
permissionTree.value = response?.data?.data || [];
</script>
