export const commonFormRules = {
    account: [createElFormItemRule('請輸入帳號')],
    email: {
        nonRequired: [
            createElFormItemRule(
                '請輸入正確的Email',
                {
                    required: false,
                    type: 'email',
                },
            ),
        ],
        required: [
            createElFormItemRule('請輸入Email'),
            createElFormItemRule('請輸入正確的Email', { type: 'email' }),
        ],
    },
    name: [createElFormItemRule('請輸入名稱')],
};
