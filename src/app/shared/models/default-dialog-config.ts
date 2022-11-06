import { MatDialogConfig } from '@angular/material/dialog'

export function defaultDialogConfig() {
  const dialogConfig = new MatDialogConfig()

  dialogConfig.disableClose = true
  dialogConfig.autoFocus = true
  dialogConfig.width = '700px'
  dialogConfig.height = '820px'

  return dialogConfig
}
