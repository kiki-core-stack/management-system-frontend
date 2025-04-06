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

// Define props, models and emits
const emit = defineEmits<{ (e: 'select'): void }>();
const filters = defineModel<TimeRangeFilter>({ required: true });

// Functions
function onSelect(type: DateRangeType) {
    // eslint-disable-next-line style/object-curly-newline
    const { endDate, startDate } = getDateRangeFromDate(new Date(), type, { setEndDateToNextDayStart: true });
    filters.value.endAt = endDate;
    filters.value.startAt = startDate;
    emit('select');
}
</script>
