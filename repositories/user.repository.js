const { sql, poolPromise } = require('../db/sql');

exports.findUserWithMusics = async (userId) => {
  const pool = await poolPromise; 
  const result = await pool.request()
    .input('userId', sql.Int, userId)
    .query(`
      SELECT 
        u.id as userId, u.name as userName,
        m.id as musicId, m.Name as musicTitle
      FROM [User] u
      LEFT JOIN [Music] m ON u.id = m.userId
      WHERE u.id = @userId
    `);
  return result.recordset || [];
};

exports.createMusic = async (music) =>{
  const pool = await poolPromise;
  const result = await pool.request()
  .input('name',sql.NVarChar,music.name)
  .input('source',sql.NVarChar,music.source)
  .input('userid',sql.Int,music.userId)
  .input('status',sql.NVarChar,music.status)
  .input('isFavorite',sql.Bit,music.isFavorite)
  .query(`INSERT INTO Music (Name, Source, UserId, Status, IsFavorite) VALUES (@name, @source, @userId, @status, @isFavorite)`)
   return { success: true };
};

exports.GetUserById = async(userId) =>{
  const pool = await poolPromise;
  const result = await pool.request()
  .input('userId',sql.Int,userId)
  .query("Select * from [User] where id = @userId")
  return result.recordset[0];
};

exports.Login = async(LoginModel) => {
  const pool = await poolPromise;
  const result = await pool.request()
  .input('username',sql.NVarChar,LoginModel.username)
  .input('password',sql.NVarChar,LoginModel.password)
  .query(`
      SELECT * FROM [User]
      WHERE Username COLLATE SQL_Latin1_General_CP1_CS_AS = @username
      AND Password COLLATE SQL_Latin1_General_CP1_CS_AS = @password
    `);
    return result.recordset[0];
}
