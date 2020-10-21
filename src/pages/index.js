const getData = async() =>
    await fetch(
        'https://localhost/api/user',
        {
            headers: {
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmN2NiODI2ZDE2NGQxZTdhMzRiMjhkYyIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTYwMjgyOTc1MywiZXhwIjoxNjAyOTE2MTUzfQ.8y7Vr8JzwX_x0aHFuQZiCFNep7puS6rKtFKUz8rNZBM'
            }
        })

