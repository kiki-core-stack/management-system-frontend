<template>
    <NuxtLink
        class="relative"
        active-class="active"
        to="/"
        @auxclick.middle.prevent
        @click.middle.prevent
    >
        <i class="fa-house fa-solid" />
    </NuxtLink>
    <NuxtLink
        v-for="(tab, index) in tabsController.tabs"
        :key="index"
        class="relative flex items-center whitespace-nowrap"
        active-class="active"
        :to="tab.url"
        @auxclick.middle.prevent="tabsController.close(index)"
        @click.right.prevent="showContextMenu($event, index)"
        @click.middle.prevent
    >
        {{ tab.title }}
        <div
            class="close-xmark flex-middle ml-2"
            @click.prevent="tabsController.close(index)"
        >
            <icon-xmark />
        </div>
    </NuxtLink>
    <ContextMenu
        ref="contextMenuRef"
        class="fs-14px"
        :model="contextMenuItems"
    />
</template>

<script lang="ts" setup>
import ContextMenu from 'primevue/contextmenu';
import type { MenuItem } from 'primevue/menuitem';

// Variables
const contextMenuAtTabIndex = ref(0);
const contextMenuItems: MenuItem[] = [
    {
        command: () => tabsController.closeAll(),
        label: '關閉全部',
    },
    {
        command: () => tabsController.closeFromIndexTo(contextMenuAtTabIndex.value - 1, 0),
        label: '關閉左邊所有',
    },
    {
        command: () => tabsController.closeFromIndexTo(contextMenuAtTabIndex.value + 1, 1024),
        label: '關閉右邊所有',
    },
];

const contextMenuRef = ref<Nullable<InstanceType<typeof ContextMenu>>>(null);
const route = useRoute();

// Functions
function showContextMenu(event: Event, index: number) {
    contextMenuAtTabIndex.value = index;
    contextMenuRef.value?.show(event);
}

// Watchers
watch(
    () => route.fullPath,
    () => {
        setTimeout(
            () => document.querySelector('#header-tabs .active')?.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
            }),
            50,
        );
    },

);
</script>

<style lang="scss" scoped>
$dark-active-bg: #2c2c2c;
$dark-hover-bg: #2b2b2b;
$light-active-bg: #f5f5f5;
$light-hover-bg: #ededed;
$box-shadow-size: 30px;

a {
    background-color: transparent;
    border-radius: 12px 12px 0 0;
    padding: 6px 15px;
    transition: 0.1s ease;

    &:hover {
        background-color: $light-hover-bg;

        &::after,
        &::before {
            box-shadow: 0 0 0 $box-shadow-size $light-hover-bg;
        }
    }

    &::after,
    &::before {
        border-radius: 100%;
        bottom: 0;
        box-shadow: 0 0 0 40px transparent;
        content: '';
        height: 20px;
        position: absolute;
        transition: 0.1s ease;
        width: 20px;
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
        background-color: $light-active-bg;
        z-index: 1000;

        &::after,
        &::before {
            box-shadow: 0 0 0 $box-shadow-size $light-active-bg;
        }
    }

    html.dark & {
        &:hover {
            background-color: $dark-hover-bg;

            &::after,
            &::before {
                box-shadow: 0 0 0 $box-shadow-size $dark-hover-bg;
            }
        }

        &.active {
            background-color: $dark-active-bg;

            &::after,
            &::before {
                box-shadow: 0 0 0 $box-shadow-size $dark-active-bg;
            }
        }

        .close-xmark:hover {
            background-color: #4a4a4a;
        }
    }

    .close-xmark {
        border-radius: 50%;
        height: 16px;
        transition: background-color 0.2s;
        width: 16px;

        &:hover {
            background-color: #e0e0e0;
        }
    }
}
</style>
