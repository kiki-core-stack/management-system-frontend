<template>
    <el-button @click="onSelect('today')">
        今天
    </el-button>
    <el-button @click="onSelect('yesterday')">
        昨天
    </el-button>
    <el-button @click="onSelect('thisWeek')">
        本周
    </el-button>
    <el-button @click="onSelect('lastWeek')">
        上週
    </el-button>
    <el-button @click="onSelect('thisMonth')">
        本月
    </el-button>
    <el-button @click="onSelect('lastMonth')">
        上月
    </el-button>
</template>

<script lang="ts" setup>
import { getDateRangeFromDate } from '@kikiutils/node/datetime';
import type { DateRangeType } from '@kikiutils/node/datetime';

interface Props {
    filterQuery?: Dict<any>;
}

// Props and emits
const props = defineProps<Props>();
const emit = defineEmits(['select']);

// Functions
function onSelect(type: DateRangeType) {
    if (!props.filterQuery) return;
    const {
        endDate,
        startDate,
    } = getDateRangeFromDate(new Date(), type, { setEndDateToNextDayStart: true });
    // eslint-disable-next-line vue/no-mutating-props
    props.filterQuery.endAt = endDate;
    // eslint-disable-next-line vue/no-mutating-props
    props.filterQuery.startAt = startDate;
    emit('select');
}
</script>
