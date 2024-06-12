UPDATE users
SET refreshToken = $1
WHERE id = $2
RETURNING TRUE