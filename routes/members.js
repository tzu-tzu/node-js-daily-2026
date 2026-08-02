// routes/members.js --day11
const express = require('express');
const router = express.Router();

let members = [
  { id: 1, name: '王小明' },
  { id: 2, name: '李小花' },
];
let nextId = 3;

function findById(list, id) {
    return list.find(member => member.id === id);
}
function validateFields(body, requiredFields) {
    // requiredFields 是一個陣列，裡面是必填欄位的名稱
    // body 是 req.body，body[field] 會是 undefined 或 null 或空字串，這些都算缺失
    return requiredFields.filter(field => !body[field]);
}

router.get('/', (req, res) => {
    res.status(200).json({status: 'success', data: members, msg: '取得所有會員成功'});
});
router.post('/', (req, res) => {
    const missingFields = validateFields(req.body, ['name']);
    if (missingFields.length > 0) {
        return res.status(400).json({ status: 'error', msg: `缺少欄位: ${missingFields.join(', ')}` });
    }

    const newMember = { id:nextId, name: req.body.name };
    members.push(newMember);
    nextId++;
    res.status(201).json({status: 'success', data: newMember, msg: '新增會員成功'});
});
router.put('/:id', (req, res) => {
    const memberData = findById(members, req.params.id);
    const missingFields = validateFields(req.body, ['name']);
    if (!memberData) {
        return res.status(404).json({ status: 'error', msg: '找不到會員' });
    }
    if (missingFields.length > 0) {
        return res.status(400).json({ status: 'error', msg: `缺少欄位: ${missingFields.join(', ')}` });
    }
    memberData.name = req.body.name;
    res.status(200).json({status: 'success', data: memberData, msg: '更新會員成功'});
});
router.delete('/:id', (req, res) => {
    const memberIndex = members.findIndex(member => member.id === parseInt(req.params.id));
    if (memberIndex === -1) {
        return res.status(404).json({ status: 'error', msg: '找不到會員' });
    }
    members.splice(memberIndex, 1);
    res.status(204).send();
});

module.exports = router;
