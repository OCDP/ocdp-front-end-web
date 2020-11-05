/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />
namespace Models {
  type WsMessage = Wsm.Common & Wsm.Content;
  namespace Wsm {
    interface Common {
      datetime: string;
      peer: string;
      avatarUrl?: string;
      username?: string;
    }
    type Content = {
      input?: Content.Input;
      upload?: Content.Upload;
      switch?: Content.Switch;
      message?: Content.Message;
      file?: Content.File;
      event?: Content.Event;
    };
    type InputContainer = { input: Content.Input } & Common;
    type UploadContainer = { upload: Content.Upload } & Common;
    type SwitchContainer = { switch: Content.Switch } & Common;
    type MessageContainer = { message: Content.Message } & Common;
    type FileContainer = { file: Content.File } & Common;
    type EventContainer = { event: Content.Event } & Common;
    namespace Content {
      interface Input {
        inputType: "text" | "date" | "number";
        keyboardType?: "date" | "number" | "email" | "text" | null;
        mask?: string;
      }
      type FileType = "custom" | "image" | "pdf" | "any";
      interface Upload {
        fileType: FileType;
        customScope?: string[];
      }
      type Option = {
        id: string;
        title: string;
        subtitle?: string;
        image?: string;
        value: string;
      };
      interface Switch {
        mode: "dynamic" | "static";
        switchType: "vertical" | "horizontal" | "slide";
        componentId: string;
        layout: "button" | "card" | "image_card" | "avatar_card";
        options: Array<Option>;
      }
      interface Message {
        messageType: "html" | "text" | "image" | "file";
        value: string;
        extras: Dict<any>;
      }
      interface File {
        fileType: FileType;
        name: string;
        url: string;
        comment?: string;
      }

      interface Event {
        eventType:
          | "typing"
          | "error"
          | "debug"
          | "entry_queue_attendance" // usuario
          | "exit_queue_attendance" // usuario
          | "update_queue" // atendente
          | "init_attendance" // atendente
          | "finish_attendance" // atendente
          | "system"
          | "connected";
        queue?: [];
        message?: string;
        imageUrl?: string;
      }

      interface Attendance {
        user: Attendance.User;
        bot: Attendance.Bot;
      }

      namespace Attendance {
        interface User {
          name?: string;
          avatar?: string;
          entered: string;
          session: string;
          peer: string;
        }

        interface Bot {
          id: string;
          avatar?: string;
          name: string;
          organization: string;
        }
      }
    }
  }
}
