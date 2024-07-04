package answer

import "github.com/apache/incubator-answer/plugin"

type EditorLineHighlight struct {
}

func init() {
	plugin.Register(&EditorLineHighlight{})
}

func (EditorLineHighlight) Info() plugin.Info {
	return plugin.Info{
		Name:        plugin.MakeTranslator("EditorLineHighlight"),
		SlugName:    "editor_line_highlight",
		Description: plugin.MakeTranslator(""),
		Author:      "IZUMI-Zu",
		Version:     "0.0.1",
		Link:        "",
	}
}
