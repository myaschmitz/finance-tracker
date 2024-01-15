const groupService = require('../services/groupService');

exports.addGroup = async (req, res) => {
    const { user_account_id, name } = req.body;

    try {
        const groupData = {
            user_account_id,
            name
        };

        const newGroup = await groupService.addGroup(groupData);
        res.json(newGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllGroups = async (req, res) => {
    try {
        const allGroups = await groupService.getAllGroups();
        res.json(allGroups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getGroup = async (req, res) => {
    const { groupId } = await req.params.id;

    try {
        const group = await groupService.getGroup(parseInt(groupId, 10));

        if (!group) {
            res.status(404).json({ error: 'Group not found' });
            return;
        }

        res.json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.editGroup = async (req, res) => {
    const { groupId } = await req.params.id;
    const updatedFields = req.body;

    try {
        const group = await groupService.editGroup(parseInt(groupId, 10), updatedFields);

        if (!group) {
            res.status(404).json({ error: 'Group not found' });
            return;
        }

        res.json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteGroup = async (req, res) => {
    const { groupId } = await req.params.id;

    try {
        const group = await groupService.deleteGroup(parseInt(groupId, 10));

        if (!group) {
            res.status(404).json({ error: 'Group not found' });
            return;
        }

        res.json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
