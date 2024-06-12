INSERT INTO users (
        name,
        email,
        userPassword,
        phoneNumber,
        gender,
        dateOfBirth
    )
VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
    )
RETURNING id,
    name,
    email,
    phoneNumber