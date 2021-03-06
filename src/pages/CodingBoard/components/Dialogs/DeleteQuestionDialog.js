import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {Alert, AlertTitle} from "@material-ui/lab";


export const DeleteQuestionDialog = props => {
  let hardDeleting = props.selectedIdx !== null && !props.questionList[props.selectedIdx].active;
  return (
    <Dialog open={props.open} maxWidth='sm' fullWidth>
      <DialogTitle>Delete a Class</DialogTitle>
      <DialogContent>
        <TextField
          select
          value={props.selectedIdx !== null ? props.selectedIdx : props.questionList.length}
          onChange={e => props.onSelect(e.target.value)}
          fullWidth
        >
          {
            props.questionList.map((each, idx) => (
              <MenuItem key={each.name} value={idx}>
                {each.name}
              </MenuItem>
            ))
          }
        </TextField>
        <div>
          {hardDeleting &&
          <Alert severity="error">
            <AlertTitle>Hard Delete</AlertTitle>
            <strong>This class will be permanently deleted.</strong>
          </Alert>
          }
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onSubmit()}>
          Delete
        </Button>
        <Button onClick={props.onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
