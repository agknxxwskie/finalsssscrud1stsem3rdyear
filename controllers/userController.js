const connection = require ('../config/db');

// GET
exports.getAllUsers = (req, res) => {
    connection.query('SELECT * FROM enrollment_bills', (err, results) => {
        if(err){
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Failed to fetch users' });
        }
        res.status(200).json(results);
    });
}

// POST
exports.createUser=(req, res) => {
    const {student_id, student_name, course_program, units_enrolled, tuition_total} = req.body;
    const balance = tuition_total; // Set balance equal to tuition_total
    connection.query('INSERT INTO enrollment_bills (student_id, student_name, course_program, units_enrolled, tuition_total, balance) VALUES (?, ?, ?, ?, ?, ?)',
    [student_id, student_name, course_program, units_enrolled, tuition_total, balance], (err, results) => {
        if(err){
            console.error('Error creating user:', err);
            return res.status(500).json({ error: 'Failed to create user' });
        }
        res.status(201).json({ message: 'Enrollment assessment created successfully', userId: results.insertId });
    });
};

// PUT
exports.updateUser=(req, res) => {
    const {id, amount_paid} = req.body;
    connection.query('SELECT balance FROM enrollment_bills WHERE id = ?', [id], (err, results) => {
        if(err){
            console.error('Error fetching user:', err);
            return res.status(400).json({ error: 'Failed to fetch user' });
        }
    connection.query('UPDATE enrollment_bills SET balance = balance - ? WHERE id = ?', [amount_paid, id], (err, results) => {
        if(err){
            console.error('ID not found:', err);
            return res.status(404).json({ error: 'ID not found' });
        }
        res.status(200).json({ message: 'Payment recorded successfully' });
    });
    });
}