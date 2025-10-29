let todosArray = [];
let nextId = 1;

function addOne(task, completed, dueDate) {
    // Check if any parameter is empty or undefined
    if (!task || Object.is(completed, null) || Object.is(completed, undefined) || !dueDate) {
        return false;
    }

    const newTodo = {
        id: nextId++,  // Assigns a unique id and increments it
        task,
        completed,
        dueDate
    };

    todosArray.push(newTodo);
    return newTodo;
}

function getAll() {
    return todosArray;
}

function findById(id) {
    const numericId = Number(id);
    const todo = todosArray.find(item => item.id === numericId);
    return todo || false; // Returns the todo or false if not found
}

function updateOneById(id, updatedData) {
    const todo = findById(id);
    if (todo) {
        // Update properties only if they are provided in updatedData
        if (updatedData.task) todo.task = updatedData.task;
        if (updatedData.completed) todo.completed = updatedData.completed;
        if (updatedData.dueDate) todo.dueDate = updatedData.dueDate;
        return todo;
    }
    return false;
}

function deleteOneById(id) {
    const todo = findById(id);
    if (todo) {
        const initialLength = todosArray.length;
        todosArray = todosArray.filter(item => item.id !== Number(id));
        return todosArray.length < initialLength; // Returns true if the array length decreased, indicating successful deletion
    }
    return false;
}

if (require.main === module) {
    // Add todo
    let result = addOne("Buy groceries", false, "2025-08-30");
    console.log(result);
    result = addOne("Learn Web Dev", false, "2025-10-30");
    console.log(result);

    console.log("getAll called:", getAll());

    console.log("findById called:", findById(1));

    console.log("updateOneById called:", updateOneById(1, { completed: true }));
    console.log("findById called after item updated:", findById(1));

    console.log("deleteOneById called:", deleteOneById(1));
    console.log("findById called after item deleted:", findById(1));
}

const ToDos = {
    getAll,
    addOne,
    findById,
    updateOneById,
    deleteOneById
};

module.exports = ToDos;