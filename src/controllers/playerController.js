export const keyboardController = (event, prevDirection,playerHeadPosition, gridRowNumItems) => {
    console.log(prevDirection);
    switch(event.which){
        case 87:
            if(prevDirection.y !== 0){
                return prevDirection
            }
            return { x: 0, y: -1, id: playerHeadPosition.id - gridRowNumItems - 1 }
        case 83:
            if(prevDirection.y !== 0){
                return prevDirection
            }
            return { x: 0, y: 1, id: playerHeadPosition.id + gridRowNumItems + 1}
        case 65:
            if(prevDirection.x !== 0){
                return prevDirection
            }
            return { x: -1, y: 0, id: playerHeadPosition.id - 1 }
        case 68:
            if(prevDirection.x !== 0){
                return prevDirection
            }
            return { x: 1, y: 0, id: playerHeadPosition.id + 1 }
        default: return prevDirection;
    }
}

export const touchController = (command, prevDirection,playerHeadPosition, gridRowNumItems) => {
    switch(command){
        case "UP":
            if(prevDirection.y !== 0){
                return prevDirection
            }
            return { x: 0, y: -1, id: playerHeadPosition.id - gridRowNumItems - 1 }
        case "DOWN":
            if(prevDirection.y !== 0){
                return prevDirection
            }
            return { x: 0, y: 1, id: playerHeadPosition.id + gridRowNumItems + 1}
        case "LEFT":
            if(prevDirection.x !== 0){
                return prevDirection
            }
            return { x: -1, y: 0, id: playerHeadPosition.id - 1 }
        case "RIGHT":
            if(prevDirection.x !== 0){
                return prevDirection
            }
            return { x: 1, y: 0, id: playerHeadPosition.id + 1 }
        default: return prevDirection;
    }
}