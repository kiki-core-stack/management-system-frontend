<template>
    <el-header
        id="layout-header-tabs-container"
        class="fs-14px flex overflow-auto bg-[#e0e0e0] dark:bg-[#4a4a4a]"
        height="unset"
    >
        <nuxt-link
            class="relative"
            active-class="active"
            to="/"
            @auxclick.middle.prevent
            @click.middle.prevent
        >
            <i-fa6-solid-house />
        </nuxt-link>
        <nuxt-link
            v-for="(tab, index) in headerTabsController.tabs"
            :key="index"
            class="relative flex items-center whitespace-nowrap"
            active-class="active"
            :to="tab.url"
            @auxclick.middle.prevent="headerTabsController.close(index)"
            @click.middle.prevent
        >
            {{ tab.title }}
            <div
                class="close-xmark flex-middle ml-2"
                @click.prevent="headerTabsController.close(index)"
            >
                <i-mdi-close />
            </div>
        </nuxt-link>
    </el-header>
</template>

<script lang="ts" setup>
// Variables
const route = useRoute();

// Watchers
watch(
    () => route.fullPath,
    () => {
        setTimeout(
            () => document.querySelector('#layout-header-tabs-container .active')?.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
            }),
            50,
        );
    },

);
</script>

<style lang="scss" scoped>
$box-shadow-size: 30px;

#layout-header-tabs-container {
    --bg-close-xmark: #e0e0e0;
    --bg-tab-active: #f5f5f5;
    --bg-tab-hover: #ededed;
    padding: 5px 15px 0 !important;

    html.dark & {
        --bg-close-xmark: #4a4a4a;
        --bg-tab-active: #2c2c2c;
        --bg-tab-hover: #2b2b2b;
    }
}

a {
    @apply bg-transparent outline-0;
    border-radius: 12px 12px 0 0;
    padding: 6px 15px;
    transition: 0.1s ease;

    &:hover {
        background-color: var(--bg-tab-hover);

        &::after,
        &::before {
            box-shadow: 0 0 0 $box-shadow-size var(--bg-tab-hover);
        }
    }

    &::after,
    &::before {
        @apply absolute bottom-0 rounded-full size-[20px];
        box-shadow: 0 0 0 40px transparent;
        content: '';
        transition: 0.1s ease;
    }

    &::after {
        clip-path: inset(50% 50% 0 -10px);
        right: -20px;
    }

    &::before {
        clip-path: inset(50% -10px 0 50%);
        left: -20px;
    }

    &.active {
        @apply z-1000;
        background-color: var(--bg-tab-active);

        &::after,
        &::before {
            box-shadow: 0 0 0 $box-shadow-size var(--bg-tab-active);
        }
    }

    .close-xmark {
        @apply size-[16px] rounded-[50%];
        transition: background-color 0.2s;

        &:hover {
            background-color: var(--bg-close-xmark);
        }
    }
}
</style>
