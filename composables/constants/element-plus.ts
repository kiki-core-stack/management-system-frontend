export const commonElDatePickerShortcuts = [
	{ text: '明天', value: getMidnightDateFromToday(1) },
	{ text: '今天', value: getMidnightDateFromToday() },
	{ text: '昨天', value: getMidnightDateFromToday(-1) },
	{ text: '7天前', value: getMidnightDateFromToday(-7) }
];

export const commonFormRules = {
	account: [createElFormItemRule('請輸入帳號')],
	email: {
		nonRequired: [createElFormItemRule('請輸入正確的Email', { required: false, type: 'email' })],
		required: [
			createElFormItemRule('請輸入Email'),
			createElFormItemRule('請輸入正確的Email', { type: 'email' })
		]
	},
	name: [createElFormItemRule('請輸入名稱')],
	otpCode: [
		createElFormItemRule('請輸入OTP驗證碼'),
		createElFormItemRule('OTP驗證碼必須為六位數字', { pattern: /^[0-9]{6}$/, type: 'regexp' })
	]
};
